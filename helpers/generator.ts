import { randomBytes } from 'crypto'

export function genFileName() {
    return `Qui_${randomBytes(2).toString('hex')}_${new Date().toDateString().split(" ").join('-')}`
}