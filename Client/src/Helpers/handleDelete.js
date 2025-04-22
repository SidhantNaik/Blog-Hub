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

            if (!response.ok) {
                throw new Error("Failed to delete");
            }

            await response.json();
            return true;

        } catch (error) {
            console.error("Error deleting:", error);
            return false;
        }
    }
    return false;
};
