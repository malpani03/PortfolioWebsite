const Project = require('../model/Project');

// Add a new project
exports.addProject = async (req, res) => {
    try {
      const { name, description, githubLink, liveProjectLink, image } = req.body;
      if (!name) {
        return res.status(400).json({ message: 'Project name is required' });
      }
  
      const newProject = new Project({ name, description, githubLink, liveProjectLink, image });
      const savedProject = await newProject.save();
      
      res.status(201).json(savedProject);
    } catch (error) {
      res.status(500).json({ message: 'Error adding project', error });
    }
  };

  

// Update an existing project
exports.updateProject = async (req, res) => {
  try {
    const { id } = req.params;
    const { name, description, githubLink, liveProjectLink, image } = req.body;

    const updatedProject = await Project.findByIdAndUpdate(
      id,
      { name, description, image, githubLink, liveProjectLink },
      { new: true }
    );

    if (!updatedProject) {
      return res.status(404).json({ message: 'Project not found' });
    }

    res.status(200).json(updatedProject);
  } catch (error) {
    res.status(500).json({ message: 'Error updating project', error });
  }
};

// Fetch all projects
exports.getProjects = async (req, res) => {
  try {
    const projects = await Project.find().select('-__v'); // Exclude __v field from response
    res.status(200).json(projects);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching projects', error });
  }
};

// Delete a project
exports.deleteProject = async (req, res) => {
  try {
    const { id } = req.params;

    const deletedProject = await Project.findByIdAndDelete(id);

    if (!deletedProject) {
      return res.status(404).json({ message: 'Project not found' });
    }

    res.status(200).json({ message: 'Project deleted successfully' });
  } catch (error) {
    res.status(500).json({ message: 'Error deleting project', error });
  }
};
