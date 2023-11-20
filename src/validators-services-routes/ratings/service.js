const e = require("express");
const messages = require("../../response/message");
const statusCodes = require("../../response/statusCode");
const Rating = require("./model");

const service={};

service.addRating = async(req, res)=>{
    try {
        req.body.userId = req.user._id;
        const alreadyRating = await Rating.findOne({userId:req.user._id,documentId:req.body.documentId}).lean();
        if(alreadyRating){
            const rating = await Rating.findByIdAndUpdate(alreadyRating._id,req.body,{new:true});
            return res.status(200).json({
                status:statusCodes.OK,
                message:messages.resourceUpdatedSuccessfully,
                result:rating
            });
        }
        const rating = await Rating.create(req.body);
        return res.status(201).json({
            status:statusCodes.CREATED,
            message:messages.resourceCreatedSuccessfully,
            result:rating
        });
    } catch (error) {
        return res.status(500).json({
            status:statusCodes.INTERNAL_SERVER_ERROR,
            message:messages.internalServerError,
            error:error.message
        });
    }
}

service.getRatings = async(req, res)=>{
    try {
        const ratings = await Rating.find({documentId:req.params.documentId}).lean();
        const avgRating = await Rating.aggregate([
            {
                $match: {
                    documentId: req.params.documentId
                }
            },
            {
                $group: {
                    _id: "$documentId",
                    avgRating: { $avg: "$rating" },
                    count: { $sum: 1 } // Count the number of ratings
                }
            },
            {
                $project: {
                    avgRating: {
                        $cond: {
                            if: { $eq: ["$count", 1] }, // If there's only one rating, return it as the average
                            then: "$rating",
                            else: "$avgRating"
                        }
                    }
                }
            }
        ]);
        console.log("avg",avgRating);
        if(ratings.length>0){
            return res.status(200).json({
                status:statusCodes.OK,
                message:messages.resourceRetrieveSuccessfully,
                result:ratings
            });
        }else{
            return res.status(403).json({
                status:statusCodes.NOT_FOUND,
                message:messages.resourceNotFound,
            })
        }
    } catch (error) {
        
    }
}

module.exports=service;