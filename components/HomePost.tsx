export const HomePost = () => {
  return (
    <div className="card w-full max-w-2xl bg-base-100 shadow-xl mx-auto mb-4">
      <div className="card-body">
        <h2 className="card-title">Post Title</h2>
        <h6 className="font-light text-primary">Date Posted : 2/5/2022</h6>
        <p>
          This is the content of the post that i have just made up right now.
          This content will be very long or short within the actual post
          depending on what the user actually wanted to post when he/she was
          writing the post.
        </p>
        <div className="card-actions justify-end">
          <button className="btn btn-primary">comment</button>
        </div>
      </div>
    </div>
  );
};
