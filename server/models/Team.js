import mongoose from "mongoose"

const TeamSchema = new mongoose.Schema(
    {
        users: [
            {
              type: mongoose.Schema.Types.ObjectId,
              ref: 'User', 
            }
        ],
        teamName: String,
    }           
)

export default mongoose.model("Team", TeamSchema)