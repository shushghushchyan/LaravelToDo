<?php
namespace App\Http\Controllers;
use App\Models\Task;
use Illuminate\Http\Request;
use Inertia\Inertia;
class TaskController extends Controller
{
    // :white_check_mark: Բոլոր tasks-ները ցույց տա միայն տվյալ user-ին
    public function getTasks()
    {
        return response()->json(
            Task::where('user_id', auth()->id())->get()
        );
    }
    // :white_check_mark: Նոր task պահպանում ենք տվյալ user-ի տակ
    public function store(Request $request)
    {
        $validated = $request->validate([
            'description' => 'required|string|max:255',
        ]);
        $task = Task::create([
            'description' => $validated['description'],
            'user_id' => auth()->id(),
            'completed' => false,
        ]);
        return response()->json($task, 201);
    }
    // :white_check_mark: Task-ի փոփոխություն (completed կամ description)
    public function update(Request $request, Task $task)
    {
        if ($task->user_id !== auth()->id()) {
            return response()->json(['error' => 'Unauthorized'], 403);
        }
        $validated = $request->validate([
            'description' => 'nullable|string|max:255',
            'completed' => 'nullable|boolean',
        ]);
        $task->update($validated);
        return response()->json($task->fresh());
    }
    // :white_check_mark: Ջնջում ենք միայն եթե user-ին է պատկանում
    public function destroy(Task $task)
    {
        if ($task->user_id !== auth()->id()) {
            return response()->json(['error' => 'Unauthorized'], 403);
        }
        $task->delete();
        return response()->json(['message' => 'Task deleted']);
    }
    // :white_check_mark: React էջը բացելու համար
    public function index()
    {
        return Inertia::render('Todo');
    }
}