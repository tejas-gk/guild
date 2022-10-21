<?php
namespace App\Traits;

use Illuminate\Database\Eloquent\Builder;

trait SortBy
{
    public function scopeSortBy(Builder $query, $sort)
    {
        if (is_null($sort)) {
            return $query;
        }

        $sorts = explode(',', $sort);

        foreach ($sorts as $sort) {
            $direction = 'asc';

            if (substr($sort, 0, 1) === '-') {
                $direction = 'desc';
                $sort = substr($sort, 1);
            }

            $query->orderBy($sort, $direction);
        }

        return $query;
    }

    public function scopeSortByDesc(Builder $query, $sort)
    {
        return $this->scopeSortBy($query, '-'.$sort);
    }

    public function scopeSortByAsc(Builder $query, $sort)
    {
        return $this->scopeSortBy($query, $sort);
    }

    public function scopeSortByDefault(Builder $query, $sort)
    {
        return $this->scopeSortBy($query, $sort);
    }

    public function scopeSortByDefaultDesc(Builder $query, $sort)
    {
        return $this->scopeSortBy($query, '-'.$sort);
    }

    public function scopeSortByDefaultAsc(Builder $query, $sort)
    {
        return $this->scopeSortBy($query, $sort);
    }

    public function scopeSortByDefaultNull(Builder $query, $sort)
    {
        return $this->scopeSortBy($query, $sort);
    }

    
}
