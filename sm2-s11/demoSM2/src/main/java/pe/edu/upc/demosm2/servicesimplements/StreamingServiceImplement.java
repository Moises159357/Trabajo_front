package pe.edu.upc.demosm2.servicesimplements;

import org.springframework.stereotype.Service;
import pe.edu.upc.demosm2.entities.Streaming;
import pe.edu.upc.demosm2.repositories.IStreammingRepository;
import pe.edu.upc.demosm2.servicesinterfaces.IStreamingService;

import java.util.List;
import java.util.Optional;

@Service
public class StreamingServiceImplement implements IStreamingService {
    private final IStreammingRepository sR;

    public StreamingServiceImplement(IStreammingRepository sR) {
        this.sR = sR;
    }

    @Override
    public void insert(Streaming s) {
        sR.save(s);
    }

    @Override
    public List<Streaming> list() {
        return sR.findAll();
    }

    @Override
    public Optional<Streaming> listId(Long id) {
        return sR.findById(id);
    }

    @Override
    public void update(Streaming s) {
        sR.save(s);
    }

    @Override
    public void delete(Long id) {
        sR.deleteById(id);
    }

    @Override
    public List<Streaming> obtenerPorEstado(boolean s) {
        return sR.findByStatusStreaming(s);
    }
}
