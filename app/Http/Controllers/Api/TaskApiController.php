<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\Task;
use Illuminate\Http\Request;

class TaskApiController extends Controller
{
    public function index(Request $request)
    {
        return response()->json($request->user()->tasks()->latest()->get());
    }

    public function store(Request $request)
    {
        $validated = $request->validate(['description' => 'required|string|max:255']);
        $task = $request->user()->tasks()->create($validated);
        return response()->json($task, 201);
    }

    public function update(Request $request, Task $task)
    {
        if ($task->user_id !== $request->user()->id) {
            return response()->json(['error' => 'Unauthorized'], 403);
        }

        $task->update($request->only(['description', 'completed']));
        return response()->json($task);
    }

    public function destroy(Request $request, Task $task)
    {
        if ($task->user_id !== $request->user()->id) {
            return response()->json(['error' => 'Unauthorized'], 403);
        }

        $task->delete();
        return response()->json(['message' => 'Deleted successfully']);
    }
}
