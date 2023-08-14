import { Command } from 'commander'
const commander = new Command()

commander
    .option('--mode <mode>', 'App execution mode', 'development')
    .parse()

export default commander