package pe.edu.upc.demosm2.servicesinterfaces;

import pe.edu.upc.demosm2.entities.Movie;

import java.util.List;
import java.util.Optional;

public interface IMovieService {
    public void insert(Movie m);
    public List<Movie> list();
    public Optional<Movie> listId(Long id);
    public void update(Movie m);
    public void delete(Long id);
    List<Object[]> obtenerTotalPeliculasPorStreaming();

}
