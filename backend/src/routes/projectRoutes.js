import express from 'express';
const router = express.Router();

import {
  getProjects,
  createProject,
  deleteProject
} from '../controllers/projectController.js';
// 💡 අමතක නොකර අගට .js කෑල්ල දැම්මා මචං!

router.route('/')
  .get(getProjects)
  .post(createProject);

router.route('/:id')
  .delete(deleteProject);

export default router;