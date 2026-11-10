package pe.edu.upc.demosm2.controllers;

import jakarta.validation.Valid;
import org.modelmapper.ModelMapper;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.servlet.support.ServletUriComponentsBuilder;
import pe.edu.upc.demosm2.dtos.StreamingDTO;
import pe.edu.upc.demosm2.entities.Streaming;
import pe.edu.upc.demosm2.exceptions.ResourceNotFoundException;
import pe.edu.upc.demosm2.servicesinterfaces.IStreamingService;

import java.net.URI;
import java.util.List;

@RestController
@RequestMapping("/api/streamings")
public class StreamingController {
    private final IStreamingService cS;
    private final ModelMapper modelMapper;

    public StreamingController(IStreamingService cS, ModelMapper modelMapper) {
        this.cS = cS;
        this.modelMapper = modelMapper;
    }

    @GetMapping
    public ResponseEntity<List<StreamingDTO>> listar() {

        List<StreamingDTO> lista = cS.list()
                .stream()
                .map(streaming -> modelMapper.map(streaming, StreamingDTO.class))
                .toList();

        return ResponseEntity.ok(lista);
    }

    @PostMapping
   // @PreAuthorize("hasRole('ADMIN')")
    public ResponseEntity<StreamingDTO> registrar(
            @Valid @RequestBody StreamingDTO dto) {

        Streaming st = modelMapper.map(dto, Streaming.class);
        st.setIdStreaming(null);
        cS.insert(st);

        StreamingDTO responseDTO =
                modelMapper.map(st, StreamingDTO.class);

        URI location = ServletUriComponentsBuilder
                .fromCurrentRequest()
                .path("/{id}")
                .buildAndExpand(st.getIdStreaming())
                .toUri();

        return ResponseEntity
                .created(location)
                .body(responseDTO);
    }

    @GetMapping("/{id}")
    public ResponseEntity<StreamingDTO> buscarId(@PathVariable Long id) {
        Streaming s = cS.listId(id).orElseThrow(() ->
                new ResourceNotFoundException(
                        "No existe el streaming con el id: " + id
                ));
        StreamingDTO dto = modelMapper.map(s, StreamingDTO.class);
        return ResponseEntity.ok(dto);
    }
    @PutMapping
    public ResponseEntity<StreamingDTO> actualizar(
            @Valid @RequestBody StreamingDTO dto) {
        Streaming existente = cS.listId(dto.getIdStreaming())
                .orElseThrow(() ->
                        new ResourceNotFoundException(
                                "No existe un streaming con el id: " + dto.getIdStreaming()
                        )
                );
        Streaming streaming = modelMapper.map(dto, Streaming.class);
        streaming.setIdStreaming(existente.getIdStreaming());
        cS.update(streaming);
        StreamingDTO responseDTO =
                modelMapper.map(streaming, StreamingDTO.class);
        return ResponseEntity.ok(responseDTO);
    }
    @DeleteMapping("/{id}")
    public ResponseEntity<Void> eliminar(@PathVariable Long id) {
        Streaming streaming = cS.listId(id)
                .orElseThrow(() ->
                        new ResourceNotFoundException(
                                "No existe un streaming con el id: " + id
                        )
                );
        cS.delete(streaming.getIdStreaming());
        return ResponseEntity.noContent().build();
    }
    @GetMapping("/status")
    public ResponseEntity<List<StreamingDTO>> obtenerPorEstado(@RequestParam boolean s) {
        List<StreamingDTO> dtos = cS.obtenerPorEstado(s).stream()
                .map(streaming -> modelMapper.map(streaming, StreamingDTO.class))
                .toList();
        return ResponseEntity.ok(dtos);
    }
}





