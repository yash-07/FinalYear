const newComment = new PostComment({
					commentText : req.body.commentText,
					postedBy : userid,
					postedTo : userid,
					datePosted : Date.now(),
					
			});

			newComment.save((err,fl) => {
						
				PostComment.find({}).then(postImage =>{
						res.render('home/index',{postImage: postImage});

							var currentid = newFile._id;
							console.log(userid);
							console.log(currentid);
						});
				});