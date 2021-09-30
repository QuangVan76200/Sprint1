const accountRouter = require('./routes');
const postRouter= require('./post');
const commentRouter=require('./postComment');

function route(app){
    app.use('/accounts',accountRouter);
    app.get('/test',function(req, res){
        res.json('ALoha')
    })

    app.use('/post',postRouter);

    app.use('/comments',commentRouter);

}
module.exports=route