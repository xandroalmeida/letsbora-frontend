export const GTMPageView = (url) => {

   const pageEvent = {
      event: 'pageview',
      page: url,
   };

   //@ts-ignore
   window && window.dataLayer && window.dataLayer.push(pageEvent);
   return pageEvent;
};

export const eventGA = ({ action, category, label, value }) => {
   window.gtag && window.gtag('event', action, {
      event_category: category,
      event_label: label,
      value: value,
   })
}