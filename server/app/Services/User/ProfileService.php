<?php

declare(strict_types=1);

namespace App\Services\User;

use Illuminate\Http\Request;

/**
 * Class ProfileService.
 */
class ProfileService
{
    public function uploadAvatar(Request $request): ?string
    {
        $avatar= ($request->hasFile('avatar'))
            ? $request->file('avatar')->store('avatars')
           : null;
        
        return $avatar;
    }
}
//  $image=$request->file('postImage');
//  $image_name=time().'.'.$image->getClientOriginalExtension();
//  $destinationPath=public_path('/storage/posts');
//  $image->move($destinationPath,$image_name);
//  $post->image=$image_name;