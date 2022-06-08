import UI from "./modules/UI";
import ProjectsList from "./modules/ProjectsList";

const model = new ProjectsList()
const view = new UI()

view.displayProjects(model.projectsList) /* temp */
view.displayTasks(model.getProject('9c66')) /* temp */