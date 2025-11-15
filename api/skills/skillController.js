import skill from "./skillModel";

const skillController = {
    addSkills: async (req, res) => {
        try {
            const { name } = req.body;
            const check = await skill.findOne({ name });
            if (check) {
                return res.status(409).json({ message: 'skill is already exits.' })
            }
            const newSkill = new skill(req.body);
            await newSkill.save();
            res.status(201).json({ message: 'Skill Saved.' })

        } catch (error) {
            res.status(500).json({ error: error.message })
        }
    },
    getSkills: async (req, res) => {
        try {
            const name = req.params.name;
            const data = await db.skill.aggregate([
                {
                    $match: { name: name },
                    
                },
                {
                    $limit:10
                }
            ])

            if (data) {
                return res.status(200).json({ data: data })
            }
            else {
                return res.status(404).json({ data: [], message: `Skills are not matched with ${name}.` });
            }
        } catch (error) {
            res.status(500).json({ error: error });
        }
    }
}

export default skillController;

// const getSkill = async (req,res)=>{
//     try {
//         const name= req.params.name;
//         const data= await db.skill.aggregate([
//             {
//                 $match:{name:name}
//             }
//         ])

//         if(data){
//             return res.status(200).json({data:data})
//         }
//         else{
//             return res.status(404).json({data:[],message:`Skills are not matched with ${name}.`});
//         }
//     } catch (error) {
//         res.status(501).json({error:error});
//     }
// }

// export default getSkill;