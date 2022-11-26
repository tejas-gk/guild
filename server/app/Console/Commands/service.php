<?php

declare(strict_types=1);

namespace App\Console\Commands;

use Illuminate\Console\Command;

class service extends Command
{
    /**
     * The name and signature of the console command.
     *
     * @var string
     */
    protected $signature = 'service';

    /**
     * The console command description.
     *
     * @var string
     */
    protected $description = 'create service directory';

    /**
     * Execute the console command.
     *
     * @return int
     */
    public function handle()
    {
        $this->info('service directory created');
        $this->call('make:service', ['name' => 'Service']);
    }
}
