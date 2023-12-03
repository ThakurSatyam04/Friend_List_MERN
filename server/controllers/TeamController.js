import Team from "../models/Team.js";
import User from "../models/User.js";

export const createTeam = async (req,res) => {
    try {
        const { teamName, userId } = req.body;
        const user = await User.findById(userId);

        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }
      
        let team = await Team.findOne({ teamName });

        if (!team) {
          team = await Team.create({ teamName, users: [user] });
        } 
        else {
          team.users.push(user);
          await team.save();
        }
        const updatedTeam = await Team.findOne({ teamName }).populate('users');
    
        res.status(200).json({ message: 'User added to team successfully', team :updatedTeam});
      } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Internal server error' });
      }
}

export const getTeamById = async (req, res) => {
    const { teamId } = req.params;
  
    try {
      const team = await Team.findById(teamId).populate('users'); 
  
      if (!team) {
        return res.status(404).json({ message: 'Team not found' });
      }
  
      res.status(200).json(team);
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: 'Internal server error' });
    }
  };
