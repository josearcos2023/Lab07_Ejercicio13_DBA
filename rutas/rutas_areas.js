var mongojs = require('mongojs');
var uri = 'mongodb://127.0.0.1:27017/Lab02'; 
var db = mongojs(uri,["Areas"]);

function areas_listado(req,res){
    db.Areas.find().sort({nombre:1},function(err,records){
        if(err){
            console.log('Error al acceder a la base de datos.');
            return;
        }
        res.render('m_areas_listado',{records: records});
    });
}

module.exports = {
    listado: function (req,res){
        areas_listado(req,res);
    },
    nuevo: function (req,res){
        res.render('m_areas_nuevo',{});
    },
    grabar_nuevo: function (req,res){
        var xnom = req.body['xnom'];
        var xabr = req.body['xabr'];
        var xest = req.body['xest'];
        db.Areas.find().sort({_id:-1},function(err,records){
            if (err){
                console.log('Error al acceder a la base de datos.');
                res.end();
                return;
            }
            var xid = records[0]._id + 1;
            db.Areas.insert({_id:xid, nombre:xnom, abreviatura:xabr, estado:xest}, function(){
                areas_listado(req,res);
            });
        });
    },
    editar: function (req,res){
        var xid = req.params.xid*1;
        console.log(xid);
        db.Areas.find({_id:xid}, function(err,records){
            if(err){
                console.log('Error al acceder a la base de datos.');
                res.end();
                return;
            }
            res.render('m_areas_editar',{area: records[0]});
        });
    },
    grabar_editar: function (req,res){
        var xid = req.body['xid' ]*1;
        var xnom = req.body['xnom'];
        var xabr = req.body['xabr'];
        var xest = req.body['xest'];

        db.Areas.updateOne({_id:xid},{$set:{nombre:xnom, abreviatura:xabr, estado:xest}}, function(){
            areas_listado(req,res);
        });
    },
    eliminar: function (req,res){
        var xid=req.params.xid*1;
        db.Areas.remove({_id:xid},function(){
            areas_listado(req,res);
        });
    }
}
























