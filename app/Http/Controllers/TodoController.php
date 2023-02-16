<?php

namespace App\Http\Controllers;

use App\Models\Todo;
use Illuminate\Database\QueryException;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Validator;

class TodoController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index()
    {
        $todos = Todo::orderBy('created_at', 'desc')->get();
        if ($todos) {
            return $this->success('success', $todos);
        } else {
            return $this->fail("Todo is not found", [], 400);
        }
    }

    /**
     * Show the form for creating a new resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function create()
    {
        //
    }

    /**
     * Store a newly created resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\Response
     */
    public function store(Request $request)
    {
        $validator = Validator::make($request->all(), [
            'title' => 'required|max:255',
            'body' => 'required'
        ]);

        $checkTodo = Todo::where('title', $request->title)->get();

        if (count($checkTodo) > 0) {
            return $this->fail("Todo " . $request->title . " already exist!", [], 400);
        }

        if ($validator->fails()) {
            return $this->fail("Field required", $this->validatorErrorMsg($validator), 400);
        }

        $todo = Todo::create([
            'title' => $request->title,
            'body' => $request->body
        ]);

        if ($todo) {
            return $this->success("success", $todo);
        } else {
            return $this->fail("Creating new todo was failed", [], 400);
        }
    }

    /**
     * Display the specified resource.
     *
     * @param  \App\Models\Todo  $todo
     * @return \Illuminate\Http\Response
     */
    public function show(Todo $todo)
    {
        //
    }

    /**
     * Show the form for editing the specified resource.
     *
     * @param  \App\Models\Todo  $todo
     * @return \Illuminate\Http\Response
     */
    public function edit(Todo $todo)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  \App\Models\Todo  $todo
     * @return \Illuminate\Http\Response
     */
    public function update(Request $request, $id)
    {
        $validator = Validator::make($request->all(), [
            'title' => 'required|max:255',
            'body' => 'required'
        ]);

        if ($validator->fails()) {
            return $this->fail("Field required", $this->validatorErrorMsg($validator), 400);
        }

        $checkTodo = Todo::where('title', $request->title)->where('id', '!=', $id)->get();

        if (count($checkTodo) > 0) {
            return $this->fail("Todo " . $request->title . " already exist!", [], 400);
        }

        $data = [
            'title' => $request->title,
            'body' => $request->body
        ];

        $update = Todo::where('id', $id)->update($data);

        if ($update) {
            $todo = Todo::where('id', $id)->first();
            return $this->success("Success", $todo);
        } else {
            return $this->fail("Failed updating todo", [], 400);
        }
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  \App\Models\Todo  $todo
     * @return \Illuminate\Http\Response
     */
    public function destroy(Request $request, $id)
    {
        $findTodo = Todo::where('id', $id)->first();

        try {
            Todo::where('id', $id)->delete();
            return $this->success("Delete success", $findTodo);
        } catch (QueryException $e) {
            return $this->fail("Todo has failed to delete", $e->getMessage(), 400);
        }
    }

    public function getTodo(Request $request)
    {
        $search = $request->search;
        $todo = Todo::where('title', 'like', '%' . $search . '%')->orderBy('created_at', 'desc')->paginate(10);
        if ($todo) {
            return $this->success("success", $todo);
        } else {
            return $this->fail("Creating new todo was failed", [], 400);
        }
    }
}
