import moment from 'moment'

export default function Timer(interval: number) {
	const duration = moment.duration(interval, 'seconds')
	return `${duration.hours()}:${duration.minutes()}:${duration.seconds()}`
}
