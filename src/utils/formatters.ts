export const formatDateTime = (date: string | number | Date) => {
    const dateArray = new Date(date)
      .toLocaleDateString('en-GB', {
        day: '2-digit',
        month: 'short',
        year: '2-digit'
      })
      .replace(/ /g, '/')
      .split('/');
  
    let formattedTime = '';
    dateArray.forEach((elem, index) => {
      if (index <= 1) {
        formattedTime += ` ${elem}`;
      } else {
        formattedTime += `, ${elem}`;
      }
    });
  
    return (
      formattedTime +
      ', ' +
      new Date(date).toLocaleTimeString('en-US', {
        hour: 'numeric',
        minute: '2-digit',
      })
    );
  };