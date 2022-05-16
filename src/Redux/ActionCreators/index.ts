import * as VKUICreators from "./vkui";
import * as ServerCreators from './server'
import * as UserCreators from "./user"

export default {
    ...VKUICreators,
    ...ServerCreators,
    ...UserCreators
}