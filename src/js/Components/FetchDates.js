
export async function fetchDates(url, target) {
    const btn_text = target.innerText;
    target.innerText = "loading...";

    try {
      const response = await fetch(url);

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      return await response.json();
    } catch (error) {
      console.log("Error: " + error);
    } finally {
      target.innerText = btn_text;
    }
  }