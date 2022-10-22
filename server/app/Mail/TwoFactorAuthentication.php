<?php

namespace App\Mail;

use Illuminate\Bus\Queueable;
use Illuminate\Mail\Mailable;
use Illuminate\Queue\SerializesModels;

class TwoFactorAuthentication extends Mailable
{
    use Queueable, SerializesModels;

    public $twoFA;

    public $recoverCode;

    public function __construct($twoFA, $recoverCode)
    {
        $this->twoFA = $twoFA;
        $this->recoverCode = $recoverCode;
    }

    public function build()
    {
        return $this->view('emails.twoFactorAuthentication', ['twoFA' => $this->twoFA, 'recoverCode' => $this->recoverCode]);
    }
}
