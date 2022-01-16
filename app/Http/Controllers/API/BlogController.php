<?php

namespace App\Http\Controllers\API;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use App\Models\Blog;
use Illuminate\Support\Str;
use Illuminate\Support\Facades\DB;
use Dotenv\Validator;

class BlogController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */

    //********* index function for return all blog data  ******/////
    public function index()
    {
        //
        $blog = Blog::paginate(10);
        return response()->json([
            'status' => 200,
            'message' => "successfull",
            'data'=>$blog
        ]);
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
    //********* store function for store unique blog data  ******/////
    public function store(Request $request)
    {
        $blogCount = Blog::all();
        $requestData = $request->all();
        $validator = \Validator::make($requestData,[ 
            'title' => 'required',
            'body' =>  'required',
            'blogImage'=>'required',
            'blogImage.*' => 'required|image|mimes:jpeg,png,jpg,gif,svg|max:2048'
        ],[
            'title.required' => 'please give title',
            'body.required' => 'please give body',
            'blogImage.required' => 'please give image',
        ]);
        if($validator->fails()){
            return response()->json([
                'status' => 405,
                'message' => $validator->getMessageBag()->first(),
            ]);
        }
        $blog = new Blog();
        $blog->title = $request->title;
        $blogslug = DB::table('blogs')->where('slug', $blog->title)->first();
        $count = sizeof($blogCount);
        if($blogslug){
            $blog->slug = str::slug($request->title.'-'.$count );
        }else{
            $blog->slug = str::slug($request->title);
        }
        $blog->body = $request->body;
        $image=$request->hasFile('blogImage');
        if($image){
            $file = $request->file('blogImage');
            $imagename=Str::random();
            $extention=strtolower($file->getClientOriginalExtension());
            $filename=$imagename.'.'.$extention;
            $uplode_path='storage/app/public/';
            $image_url=$uplode_path.$filename;
            $success=$file->move($uplode_path,$filename);
            $blog->blogImage = $image_url;
            $blog->save();
            return response()->json([
                'status' => 200,
                'message' => "successfull",
                'data'=>$blog
            ]);
        }else{
        $blog->save();
        return response()->json([
            'status' => 200,
            'message' => "successfull",
            'data'=>$blog
        ]);
    }
    }

    

    /**
     * Display the specified resource.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    //********* show function for show single unique blog data by id  ******/////
    public function show($id)
    {
        $blogdata = Blog::find($id);
        return response()->json([
            'status' => 200,
            'message' => "find successfull",
            'data'=>$blogdata
        ]);
    }
    
    //********* SinglePostshow function for show single unique blog data by slug  ******/////
    public function SinglePostshow($slug)
    {
        $blogdata = Blog::where('slug', $slug)->first();
        return response()->json([
            'status' => 200,
            'message' => "find successfull",
            'data'=>$blogdata
        ]);
    }

    /**
     * Show the form for editing the specified resource.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function edit($id)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */

    //********* update function for update unique blog data  ******/////
    public function update(Request $request, $id)
    {
        $blogdata = Blog::find($id);
        if(is_null($blogdata)){
            return response()->json([
                'status' => 202,
                'message' => "not found",
                'data'=>null
            ]);
        }
        $requestData = $request->all();
        $validator = \Validator::make($requestData,[ 
            'title' => 'required',
            'body' =>  'required',
            'blogImage'=>'required'
        ],[
            'title.required' => 'please give title',
            'body.required' => 'please give body',
            'blogImage.required' => 'please give image',
        ]);
        if($validator->fails()){
            return response()->json([
                'status' => 405,
                'message' => $validator->getMessageBag()->first(),
            ]);
        }
        $blog = Blog::find($id);
        $blog->title = $request->title;
        $blog->body = $request->body;
        $image=$request->hasFile('blogImage');
        if($image){
            $file = $request->file('blogImage');
            $imagename=Str::random();
            $extention=strtolower($file->getClientOriginalExtension());
            $filename=$imagename.'.'.$extention;
            $uplode_path='storage/app/public/';
            $image_url=$uplode_path.$filename;
            $success=$file->move($uplode_path,$filename);
            $blog->blogImage = $image_url;
            $blog->save();
            return response()->json([
                'status' => 200,
                'message' => "successfull",
                'data'=>$blog
            ]);
        }else{
        $blog->blogImage = $blog->blogImage;    
        $blog->save();
        return response()->json([
            'status' => 200,
            'message' => "successfull",
            'data'=>$blog
        ]);
    }
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
     //********* destroy function for destroy unique blog data  ******/////
    public function destroy($id)
    {
        $blogdata = Blog::find($id);
        $blogdata->delete();
        return response()->json([
            'status' => 200,
            'message' => "successfully delete",
            'data'=>$blogdata,
        ]);
    }
}

