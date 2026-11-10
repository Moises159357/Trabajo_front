package pe.edu.upc.demosm2.controllers;

import jakarta.validation.Valid;
import org.modelmapper.ModelMapper;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.servlet.support.ServletUriComponentsBuilder;
import pe.edu.upc.demosm2.dtos.MovieDTO;
import pe.edu.upc.demosm2.dtos.TotalDTO;
import pe.edu.upc.demosm2.entities.Movie;
import pe.edu.upc.demosm2.entities.Streaming;
import pe.edu.upc.demosm2.exceptions.ResourceNotFoundException;
import pe.edu.upc.demosm2.servicesinterfaces.IMovieService;
import pe.edu.upc.demosm2.servicesinterfaces.IStreamingService;

import java.net.URI;
import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping("/movies")
public class MovieController {
    private final IMovieService mS;
    private final IStreamingService sS;
    private final ModelMapper modelMapper;

    public MovieController(IMovieService mS, IStreamingService sS, ModelMapper modelMapper) {
        this.mS = mS;
        this.sS = sS;
        this.modelMapper = modelMapper;
    }

    @GetMapping
    public ResponseEntity<List<MovieDTO>> listar() {

        List<MovieDTO> lista = mS.list()
                .stream()
                .map(movie -> modelMapper.map(movie, MovieDTO.class))
                .toList();

        return ResponseEntity.ok(lista);
    }
    @PostMapping
    public ResponseEntity<MovieDTO> registrar(
            @Valid @RequestBody MovieDTO dto) {
        Streaming s = sS.listId(dto.getIdStreaming())
                .orElseThrow(() ->
                        new ResourceNotFoundException(
                                "No existe el streaming con el id: " + dto.getIdStreaming()
                        )
                );
        Movie mv = modelMapper.map(dto, Movie.class);
        mv.setIdMovie(mv.getIdMovie());
        mS.insert(mv);

        MovieDTO responseDTO =
                modelMapper.map(mv, MovieDTO.class);

        URI location = ServletUriComponentsBuilder
                .fromCurrentRequest()
                .path("/{id}")
                .buildAndExpand(mv.getIdMovie())
                .toUri();

        return ResponseEntity
                .created(location)
                .body(responseDTO);
    }
    @GetMapping("/{id}")
    public ResponseEntity<MovieDTO> buscarPorId(
            @PathVariable Long id) {

        Movie mv = mS.listId(id)
                .orElseThrow(() ->
                        new ResourceNotFoundException(
                                "No existe una película con el id: " + id
                        )
                );

        MovieDTO dto = modelMapper.map(mv, MovieDTO.class);
        return ResponseEntity.ok(dto);
    }
    @PutMapping
    public ResponseEntity<MovieDTO> actualizar(
            @Valid @RequestBody MovieDTO dto) {

        // 1. Verificar que la película exista
        Optional<Movie> existente = mS.listId(dto.getIdMovie());

        if (existente.isEmpty()) {
            throw new ResourceNotFoundException(
                    "No existe una película con el id: " + dto.getIdMovie()
            );
        }

        // 2. Verificar que el streaming exista
        Optional<Streaming> streaming = sS.listId(dto.getIdStreaming());

        if (streaming.isEmpty()) {
            throw new ResourceNotFoundException(
                    "No existe un streaming con el id: " + dto.getIdStreaming()
            );
        }

        // 3. Obtener la película existente
        Movie movie = existente.get();

        // 4. Actualizar sus campos
        movie.setTitleMovie(dto.getTitleMovie());
        movie.setSynopsisMovie(dto.getSynopsisMovie());
        movie.setReleaseDateMovie(dto.getReleaseDateMovie());
        movie.setDurationMovie(dto.getDurationMovie());
        movie.setInversionMovie(dto.getInversionMovie());
        movie.setAverageRatingMovie(dto.getAverageRatingMovie());

        // 5. Asignar el streaming existente
        movie.setStreaming(streaming.get());

        // 6. Guardar
        mS.update(movie);

        // 7. Convertir a DTO
        MovieDTO responseDTO =
                modelMapper.map(movie, MovieDTO.class);

        return ResponseEntity.ok(responseDTO);
    }
    @DeleteMapping("/{id}")
    public ResponseEntity<Void> eliminar(@PathVariable Long id) {
        Movie mv = mS.listId(id)
                .orElseThrow(() ->
                        new ResourceNotFoundException(
                                "No existe una película con el id: " + id
                        )
                );
        mS.delete(mv.getIdMovie());
        return ResponseEntity.noContent().build();
    }
    @GetMapping("/total")
    public ResponseEntity<List<TotalDTO>> obtenerTotalCultivo() {

        List<TotalDTO> lista = mS.obtenerTotalPeliculasPorStreaming()
                .stream()
                .map(item -> {
                    TotalDTO dto = new TotalDTO();

                    dto.setNameStreaming((String) item[0]);
                    dto.setTotalMovies(((Number) item[1]).longValue());

                    return dto;
                })
                .toList();

        return ResponseEntity.ok(lista);
    }

}
