var express=require("express"),app=express(),server=require("http").Server(app),io=require("socket.io")(server);app.use(express["static"](__dirname+"/public")),app.all("/",function(e,i){i.status(404).send("Page not found.")});var visitor={name:"Eric",appointment:"2:30PM",checkin:"2:15PM"},visitorTwo={name:"Daniel",appointment:"2:15PM",checkin:"2:03PM"},visitorThree={name:"Bob",appointment:"2:10PM",checkin:"2:05PM"},visitorFour={name:"Joe",appointment:"1:40PM",checkin:"1:37PM"},visitors=[visitor,visitorTwo];io.on("connection",function(e){console.log("a user connected"),io.emit("send list",visitors)}),io.on("updated list",function(e){io.emit("send list",visitors)}),server.listen(3e3);var visitor={name:"Eric",appointment:"2:30PM",checkin:"2:15PM"};console.log("sending over: "+visitor.name);