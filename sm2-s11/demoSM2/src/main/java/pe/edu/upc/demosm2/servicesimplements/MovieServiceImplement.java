package pe.edu.upc.demosm2.servicesimplements;

import org.springframework.stereotype.Service;
import pe.edu.upc.demosm2.entities.Movie;
import pe.edu.upc.demosm2.repositories.IMovieRepository;
import pe.edu.upc.demosm2.servicesinterfaces.IMovieService;

import java.util.List;
import java.util.Optional;

@Service
public class MovieServiceImplement implements IMovieService {
    private final IMovieRepository mR;

    public MovieServiceImplement(IMovieRepository mR) {
        this.mR = mR;
    }

    @Override
    public void insert(Movie m) {
        mR.save(m);
    }

    @Override
    public List<Movie> list() {
        return mR.findAll();
    }

    @Override
    public Optional<Movie> listId(Long id) {
        return mR.findById(id);
    }

    @Override
    public void update(Movie m) {
        mR.save(m);
    }

    @Override
    public void delete(Long id) {
        mR.deleteById(id);
    }

    @Override
    public List<Object[]> obtenerTotalPeliculasPorStreaming() {
        return mR.getTotalMovie();
    }
}
