import Project from '../models/Project.js';
// 💡 අමතක නොකර අගට .js කෑල්ල දැම්මා මචං!

/**
 * @desc    Get all project showcases
 * @route   GET /api/projects
 * @access  Public
 */
export const getProjects = async (req, res) => {
  try {
    const { theme } = req.query;
    const filter = {};
    if (theme && theme !== 'All') {
      filter.theme = theme;
    }
    const projects = await Project.find(filter).sort({ createdAt: -1 });
    res.status(200).json(projects);
  } catch (error) {
    res.status(500).json({ error: 'Server error retrieving project showcase list' });
  }
};

/**
 * @desc    Add a new project build showcase
 * @route   POST /api/projects
 * @access  Private/Admin
 */
export const createProject = async (req, res) => {
  try {
    const { name, brand, theme, specs, description } = req.body;
    if (!name || !brand || !theme || !specs || !specs.hp || !specs.launch || !specs.sound || !description) {
      return res.status(400).json({ error: 'Please provide all required fields including specs (hp, launch, sound)' });
    }

    const newProject = await Project.create({
      name,
      brand,
      theme,
      specs,
      description
    });

    res.status(201).json(newProject);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

/**
 * @desc    Delete a project showcase build
 * @route   DELETE /api/projects/:id
 * @access  Private/Admin
 */
export const deleteProject = async (req, res) => {
  try {
    const { id } = req.params;
    const project = await Project.findById(id);
    if (!project) {
      return res.status(404).json({ error: 'Project showcase not found' });
    }
    await Project.findByIdAndDelete(id);
    res.status(200).json({ message: 'Project showcase successfully deleted' });
  } catch (error) {
    res.status(500).json({ error: 'Server error deleting project showcase' });
  }
};