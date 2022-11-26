<?php

declare(strict_types=1);

namespace App\Traits;

use Illuminate\Database\Eloquent\Builder;

trait SortBy
{
    public function sortByDesc(Builder $query, string $column): Builder
    {
        return $query->orderBy($column, 'desc');
    }
}
