export interface Ticket {
    id: number;
    title: string;
    message: string;
    response: string;
    response_time: string;
    category: string;
    created_at: string;
    priority: "Low" | "Medium" | "High";
    status: "Open" | "In Progress" | "Closed";
}
