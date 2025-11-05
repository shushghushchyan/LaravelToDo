<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Task extends Model
{
    use HasFactory;

    // ✅ Table name (optional — Laravel auto detects plural)
    protected $table = 'tasks';


    protected $fillable = ['description', 'user_id', 'completed'];
public function user()
{
    return $this->belongsTo(User::class);
}


    // ✅ Default attribute values
    protected $attributes = [
        'completed' => false,
    ];
    
}


