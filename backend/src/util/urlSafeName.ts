export default function urlSafeName(name: string) {
	return name.toLowerCase().replace(/[^a-z0-9-]/, '-')
}
