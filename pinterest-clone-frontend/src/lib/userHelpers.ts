type User = {
    id: string
    first_name: string
    last_name: string
    email: string
}

export function getUserInitials(user: User | null | undefined): string {
    if (!user || !user.first_name || !user.last_name) return "--"
    return `${user.first_name[0]}${user.last_name[0]}`
}

export function getXAccountInitials(name: string): string {
    if (!name) return "--"
    const parts = name.trim().split(" ")
    if (parts.length === 1) {
        return parts[0].substring(0, 2).toUpperCase()
    }
    return `${parts[0][0]}${parts[parts.length - 1][0]}`.toUpperCase()
}
