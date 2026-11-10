package pe.edu.upc.demosm2.repositories;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;
import pe.edu.upc.demosm2.entities.Movie;

import java.util.List;

@Repository
public interface IMovieRepository extends JpaRepository<Movie, Long> {
    @Query(value = "select s.name_streaming, count(m.id_movie)\n" +
            " from streamings s inner  join movies m \n" +
            " on s.id_streaming=m.id_streaming\n" +
            " group by s.id_streaming, s.name_streaming", nativeQuery = true)
    List<Object[]> getTotalMovie();
}
