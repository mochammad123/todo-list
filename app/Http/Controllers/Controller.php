<?php

namespace App\Http\Controllers;

use Illuminate\Foundation\Auth\Access\AuthorizesRequests;
use Illuminate\Foundation\Bus\DispatchesJobs;
use Illuminate\Foundation\Validation\ValidatesRequests;
use Illuminate\Routing\Controller as BaseController;

class Controller extends BaseController
{
    use AuthorizesRequests, DispatchesJobs, ValidatesRequests;

    public function success(string $msg, $data = [], $option = 0)
    {
        return response()->json([
            'success' => true,
            'message' => $msg,
            'data' => $data
        ], 200, [], $option);
    }

    public function fail(string $msg, $data = [], $code = 200)
    {
        return response()->json([
            'success' => false,
            'message' => $msg,
            'data' => $data
        ], $code);
    }

    public function validatorErrorMsg($validator)
    {
        $vError = json_decode($validator->errors());
        $str = '';
        foreach ($vError as $key => $value) {
            $str .= $key . ", ";
        }
    }
}
