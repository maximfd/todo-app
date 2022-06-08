import UI from "./modules/UI";
import ProjectsList from "./modules/ProjectsList";
import Events from "./modules/Events";

const model = new ProjectsList()
const view = new UI()
const app = new Events(model, view)
