<?php

namespace App\Mail;

use Illuminate\Bus\Queueable;
use Illuminate\Mail\Mailable;
use Illuminate\Queue\SerializesModels;
use Illuminate\Contracts\Queue\ShouldQueue;

class ContactForm extends Mailable
{
    use Queueable, SerializesModels;
    public $x;
    /**
     * Create a new message instance.
     *
     * @return void
     */
    public function __construct($x)
    {
        $this->x = $x;
    }


    /**
     * Build the message.
     *
     * @return $this
     */
    public function build()
    {
        return $this->subject('Thank You for connecting with Study Spectrum')->markdown('emails.ContactForm');
    }
}
