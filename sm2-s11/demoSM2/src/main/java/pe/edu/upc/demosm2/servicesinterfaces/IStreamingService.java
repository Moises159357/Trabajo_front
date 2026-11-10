package pe.edu.upc.demosm2.servicesinterfaces;

import pe.edu.upc.demosm2.entities.Streaming;

import java.util.List;
import java.util.Optional;

public interface IStreamingService {
    public void insert(Streaming s);
    public List<Streaming>list();
    public Optional<Streaming>listId(Long id);
    public void update(Streaming s);
    public void delete(Long id);
    public List<Streaming> obtenerPorEstado(boolean s);

}
