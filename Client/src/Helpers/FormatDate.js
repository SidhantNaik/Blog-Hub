const FormatDate = (date) => {
    if (!date || date === undefined) return 'No date';
    try {
        return new Date(date).toLocaleDateString('en-US', {
            year: 'numeric',
            month: 'long',
            day: 'numeric'
        });
    } catch (error) {
        return 'Invalid date';
    }
}

export default FormatDate;