import * as VKUICreators from "./vkui";
import * as ServerCreators from './server'
import * as UserCreators from "./user"

const e = {
    ...VKUICreators,
    ...ServerCreators,
    ...UserCreators
}

export default e