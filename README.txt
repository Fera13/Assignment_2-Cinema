Componants division:

I have divided my files depending on if they are big components that create pages or if they are componants that represent parts of pages that are being loaded.

The page files that I have are: 
1. AllMovies which is the main page where you can see all the movies displayed and you can sort and filter them.
2. ViewMoreInfo which is the page loaded when you click to see more details about a specific movie. It includes date and time, movie duration, screenings, buttons to book seats and the poster and title of the movie.
3. DisplaySeats which appears when someone chooses a screening from the ViewMoreInfo page of a movie and it shows a visual representation of the seat arrangement in the hall and allows the user to choose number of people, seats and ticket types.

The componants' files that I have are:
1. Movie which displays a movie card with the poster, the title and categories of the movie and by calling it in a loop, it creates all movie cards one by one in the AllMovies page.
2. Navbar which creates the navigation bar at the top of every page.
3. Footer which creates a footer at the bottom of every page.
4. FiltersAndSorters which creates the filers and sorters that you can see in the AllMovies page in order to sort and filter the displayed movies.
5. TicketTypeSlider which creates type sliders for the different ticket types when you select seats in the DisplaySeats page.
6. ModalReceipt which creates a Modal with booking information and with a booking number when you click on the Book button in the DisplaySeats page.

