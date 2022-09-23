const app = require('./app');
const PORT = 3000;

app.use(async ctx=>{
   ctx.body = "Hello deployment";
 });
app.listen(process.env.PORT ||PORT,()=>{
   console.log(`Server is running on ${PORT}....`);
});

