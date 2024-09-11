import { cron } from '@elysiajs/cron'


export default cron({
    name: 'heartbeat',
    pattern: '* * * * * *',
    run() {
        console.log('Heartbeat')
    }
})

    