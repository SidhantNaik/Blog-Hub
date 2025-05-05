export const deleteData = async (endpoint) => {
    const confirmDelete = confirm(
        "Are you sure you want to delete this item? This action cannot be undone."
    );

    if (confirmDelete) {
        try {
            const response = await fetch(endpoint, {
                method: "DELETE",
                credentials: "include",
            });

            if (response.status === 200 || response.status === 204) {
                return true;
            }

            const data = await response.json();
            console.error("Server response:", data);
            throw new Error(data.message || "Failed to delete");

        } catch (error) {
            console.error("Error deleting:", error);
            return false;
        }
    }
    return false;
};
