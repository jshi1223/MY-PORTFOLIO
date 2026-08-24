<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\Inquiry;
use Illuminate\Http\JsonResponse;
use Illuminate\Support\Facades\Log;
use Illuminate\Support\Facades\Mail;

class InquiryController extends Controller
{
    public function store(): JsonResponse
    {
        $data = request()->validate([
            'name' => ['required', 'string', 'max:120'],
            'email' => ['required', 'email', 'max:190'],
            'company' => ['nullable', 'string', 'max:190'],
            'budget' => ['required', 'string', 'max:60'],
            'timeline' => ['required', 'string', 'max:60'],
            'project_type' => ['required', 'string', 'max:80'],
            'description' => ['required', 'string', 'min:20', 'max:5000'],
        ]);

        $inquiry = Inquiry::create($data);

        // Optional email notification — failures never block the response.
        $notify = env('INQUIRY_NOTIFY_EMAIL');
        if ($notify) {
            try {
                Mail::raw($this->renderBody($inquiry), function ($message) use ($notify, $inquiry) {
                    $message->to($notify)
                        ->subject("New project inquiry — {$inquiry->name}")
                        ->replyTo($inquiry->email, $inquiry->name);
                });
            } catch (\Throwable $e) {
                Log::warning('Inquiry notification failed: '.$e->getMessage());
            }
        }

        return response()->json([
            'ok' => true,
            'id' => $inquiry->id,
            'message' => "Got it! I'll reply within one business day.",
        ], 201);
    }

    private function renderBody(Inquiry $i): string
    {
        return <<<TXT
            New project inquiry from the portfolio site.

            Name:         {$i->name}
            Email:        {$i->email}
            Company:      {$i->company}
            Budget:       {$i->budget}
            Timeline:     {$i->timeline}
            Project type: {$i->project_type}

            Description:
            {$i->description}
            TXT;
    }
}
