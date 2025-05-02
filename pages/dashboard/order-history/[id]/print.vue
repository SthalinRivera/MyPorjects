<template>
  <div class="p-6 print:p-0 max-w-4xl mx-auto">
    <!-- Botones de acción (solo visibles en pantalla) -->
    <div class="flex justify-end gap-3 mb-6 print:hidden">
      <UButton icon="i-heroicons-arrow-left" label="Volver al pedido" color="gray"
        :to="`/dashboard/orders/${order?.id}`" />
      <UButton icon="i-heroicons-printer" label="Imprimir" color="primary" @click="printPage" />
    </div>

    <!-- Contenido para imprimir -->
    <div v-if="loading" class="flex justify-center py-12">
      <USpin />
    </div>

    <!-- Vista normal (detallada) -->
    <div v-else-if="order && !compactView"
      class="bg-white print:bg-transparent p-6 print:p-0 rounded-lg print:rounded-none shadow print:shadow-none">
      <!-- Encabezado -->
      <div class="flex justify-between items-start mb-8 border-b pb-6">
        <div>
          <h1 class="text-2xl font-bold">Pedido #{{ order.id }}</h1>
          <p class="text-gray-500">{{ formatDate(order.createdAt) }}</p>
        </div>
        <div class="text-right">
          <UBadge :label="formatStatus(order.status)" :color="statusColor(order.status)" size="lg" />
          <p v-if="order.source" class="mt-1 text-sm text-gray-500">
            Origen: {{ formatSource(order.source) }}
          </p>
        </div>
      </div>

      <!-- Información del cliente y pedido -->
      <div class="grid grid-cols-1 md:grid-cols-2 gap-8 mb-8">
        <div>
          <h2 class="text-lg font-semibold mb-3">Información del Cliente</h2>
          <div class="space-y-1">
            <p class="font-medium">{{ order.user?.name || order.clientName || 'Invitado' }}</p>
            <p v-if="order.user?.email || order.clientEmail">
              {{ order.user?.email || order.clientEmail }}
            </p>
            <p v-if="order.user?.phoneNumber || order.clientPhone">
              {{ order.user?.phoneNumber || order.clientPhone }}
            </p>
          </div>
        </div>

        <div>
          <h2 class="text-lg font-semibold mb-3">Detalles del Pedido</h2>
          <div class="space-y-1">
            <p>
              <span class="text-gray-500">Método de pago:</span>
              {{ formatPaymentMethod(order.paymentMethod) }}
            </p>
            <p>
              <span class="text-gray-500">Estado de pago:</span>
              <UBadge :label="formatPaymentStatus(order.paymentStatus)"
                :color="order.paymentStatus === 'PAID' ? 'green' : 'red'" size="sm" />
            </p>
            <p v-if="order.trackingNumber">
              <span class="text-gray-500">N° de seguimiento:</span>
              {{ order.trackingNumber }}
            </p>
          </div>
        </div>
      </div>

      <!-- Dirección de envío -->
      <div class="mb-8" v-if="order.shippingAddress">
        <h2 class="text-lg font-semibold mb-3">Dirección de Envío</h2>
        <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <p class="font-medium">{{ order.shippingAddress.recipientName }}</p>
            <p>{{ order.shippingAddress.street }}</p>
            <p>{{ order.shippingAddress.city }}, {{ order.shippingAddress.state }}</p>
            <p>{{ order.shippingAddress.postalCode }}</p>
            <p>{{ order.shippingAddress.country }}</p>
          </div>
          <div>
            <p>
              <span class="text-gray-500">Teléfono:</span>
              {{ order.shippingAddress.phone }}
            </p>
            <p v-if="order.shippingAddress.notes">
              <span class="text-gray-500">Notas:</span>
              {{ order.shippingAddress.notes }}
            </p>
          </div>
        </div>
      </div>

      <!-- Productos -->
      <div class="mb-8">
        <h2 class="text-lg font-semibold mb-3">Productos</h2>
        <UTable :rows="order.orderItems" :columns="productColumns" class="w-full"
          :ui="{ th: { base: 'bg-gray-50 dark:bg-gray-800' } }">
          <template #product-data="{ row }">
            <div class="flex items-center gap-3">
              <UAvatar :src="row.product.imageUrl || '/placeholder-product.png'" size="xs" />
              <div>
                <p class="font-medium">{{ row.product.name }}</p>
                <p v-if="row.product.sku" class="text-sm text-gray-500">SKU: {{ row.product.sku }}</p>
              </div>
            </div>
          </template>

          <template #price-data="{ row }">
            S/. {{ row.price }}
          </template>

          <template #total-data="{ row }">
            S/. {{ (row.price * row.quantity) }}
          </template>
        </UTable>
      </div>

      <!-- Resumen de pagos -->
      <div class="flex justify-end">
        <div class="w-full md:w-1/2 space-y-2">
          <div class="flex justify-between">
            <span class="text-gray-500">Subtotal:</span>
            <span>S/. {{ order.subtotal }}</span>
          </div>

          <div v-if="order.discount > 0" class="flex justify-between">
            <span class="text-gray-500">Descuento:</span>
            <span class="text-red-500">-S/. {{ order.discount }}</span>
          </div>

          <div class="flex justify-between">
            <span class="text-gray-500">Envío:</span>
            <span>S/. {{ order.shippingCost }}</span>
          </div>

          <div class="flex justify-between font-bold text-lg border-t border-gray-200 pt-2 mt-2">
            <span>Total:</span>
            <span>S/. {{ order.total }}</span>
          </div>

          <div v-if="order.coupon" class="text-sm text-blue-500 mt-2">
            Cupón aplicado: {{ order.coupon.code }} (-{{ order.coupon.discount }}{{ order.coupon.isPercentage ? '%' :
              'S/.'
            }})
          </div>
        </div>
      </div>

      <!-- Notas -->
      <div v-if="order.notes || order.internalNotes" class="mt-8 pt-6 border-t border-gray-200">
        <h2 class="text-lg font-semibold mb-3">Notas</h2>
        <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div v-if="order.notes">
            <h3 class="font-medium text-gray-700">Notas del Cliente</h3>
            <p class="text-gray-600">{{ order.notes }}</p>
          </div>
          <div v-if="order.internalNotes">
            <h3 class="font-medium text-gray-700">Notas Internas</h3>
            <p class="text-gray-600">{{ order.internalNotes }}</p>
          </div>
        </div>
      </div>

      <!-- Pie de página -->
      <div class="mt-12 pt-6 border-t border-gray-200 text-center text-sm text-gray-500">
        <p>Gracias por su compra!</p>
        <p class="mt-1">{{ new Date().toLocaleDateString('es-ES', { year: 'numeric', month: 'long', day: 'numeric' }) }}
        </p>
      </div>
    </div>

    <!-- Vista compacta para imprimir (oculta en pantalla) -->
    <div v-else-if="order" class="hidden print:block compact-receipt">
      <div class="text-center mb-2">
        <h1 class="font-bold text-lg">{{ shopInfo.name }}</h1>
        <p class="text-sm">{{ shopInfo.address }}</p>
        <p class="text-sm">RUC {{ shopInfo.ruc }}</p>
        <p class="font-bold mt-2">COMPROBANTE DE PEDIDO</p>
        <p class="text-sm">N° {{ order.id }}</p>
      </div>

      <div class="border-t border-b border-black py-2 my-2">
        <p><span class="font-semibold">Cliente:</span> {{ order.user?.name || order.clientName || 'PÚBLICO EN GENERAL'
        }}
        </p>
        <p v-if="order.user?.document || order.clientDocument"><span class="font-semibold">Doc:</span> {{
          order.user?.document || order.clientDocument || 'ND' }}</p>
        <p v-if="order.shippingAddress"><span class="font-semibold">Dirección:</span> {{ order.shippingAddress.street }}
        </p>
      </div>

      <div class="mb-4">
        <p><span class="font-semibold">Fecha:</span> {{ formatCompactDate(order.createdAt) }}</p>
        <p><span class="font-semibold">Moneda:</span> SOLES</p>
        <p><span class="font-semibold">Estado:</span> {{ formatStatus(order.status) }}</p>
        <p v-if="order.paymentMethod"><span class="font-semibold">Pago:</span> {{
          formatPaymentMethod(order.paymentMethod)
        }} ({{ formatPaymentStatus(order.paymentStatus) }})</p>
      </div>

      <table class="w-full mb-4">
        <thead>
          <tr class="border-b border-black">
            <th class="text-left w-10">Cant.</th>
            <th class="text-left">Descripción</th>
            <th class="text-right">P.Unit</th>
            <th class="text-right">Total</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="item in order.orderItems" :key="item.id" class="border-b border-gray-200">
            <td>{{ item.quantity }}</td>
            <td>{{ item.product.name }}</td>
            <td class="text-right">S/ {{ item.price }}</td>
            <td class="text-right">S/ {{ (item.price * item.quantity) }}</td>
          </tr>
        </tbody>
      </table>

      <div class="text-right border-t border-black pt-2">
        <p><span class="font-semibold">Subtotal:</span> S/ {{ order.subtotal }}</p>
        <p v-if="order.discount > 0"><span class="font-semibold">Descuento:</span> -S/ {{ order.discount }}
        </p>
        <p><span class="font-semibold">Envío:</span> S/ {{ order.shippingCost }}</p>
        <p class="font-bold text-lg"><span>TOTAL:</span> S/ {{ order.total }}</p>
      </div>

      <div v-if="order.coupon" class="text-right text-sm text-gray-600">
        Cupón: {{ order.coupon.code }} (-{{ order.coupon.discount }}{{ order.coupon.isPercentage ? '%' : 'S/' }})
      </div>

      <div class="mt-4 text-center text-xs">
        <p>IMPORTE EN LETRAS: {{ amountInWords(order.total) }}</p>
        <p class="mt-2">Representación impresa del pedido</p>
        <p v-if="order.notes"><span class="font-semibold">Notas:</span> {{ order.notes }}</p>
        <p class="mt-2">¡Gracias por su compra!</p>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
const route = useRoute();
const { $toast } = useNuxtApp();

const order = ref<any>(null);
const loading = ref(true);
const error = ref<any>(null);
const compactView = ref(false);

// Configuración de tu tienda
const shopInfo = {
  name: "TU EMPRESA EIRL",
  address: "DIRECCIÓN DE TU EMPRESA",
  ruc: "12345678901"
};

// Columnas para la tabla de productos
const productColumns = [
  { key: 'product', label: 'Producto' },
  { key: 'price', label: 'Precio Unitario', class: 'text-right' },
  { key: 'quantity', label: 'Cantidad', class: 'text-right' },
  { key: 'total', label: 'Total', class: 'text-right' }
];

const id = route.params.id as string;

// Formatear fecha completa
const formatDate = (dateString: string) => {
  const options: Intl.DateTimeFormatOptions = {
    year: 'numeric',
    month: 'short',
    day: 'numeric',
    hour: '2-digit',
    minute: '2-digit'
  };
  return new Date(dateString).toLocaleDateString('es-ES', options);
};

// Formatear fecha compacta
const formatCompactDate = (dateString: string) => {
  return new Date(dateString).toLocaleDateString('es-ES', {
    day: '2-digit',
    month: '2-digit',
    year: 'numeric',
    hour: '2-digit',
    minute: '2-digit'
  });
};

// Formatear estado para mostrar
const formatStatus = (status: string) => {
  const statusMap: Record<string, string> = {
    PENDING: "Pendiente",
    PROCESSED: "Procesado",
    SHIPPED: "Enviado",
    DELIVERED: "Entregado",
    CANCELED: "Cancelado"
  };
  return statusMap[status] || status;
};

// Color según estado
const statusColor = (status: string) => {
  const colors: Record<string, string> = {
    PENDING: "amber",
    PROCESSED: "blue",
    SHIPPED: "purple",
    DELIVERED: "green",
    CANCELED: "red"
  };
  return colors[status] || "gray";
};

// Formatear método de pago
const formatPaymentMethod = (method: string) => {
  const methods: Record<string, string> = {
    CASH: "Efectivo",
    CARD: "Tarjeta",
    TRANSFER: "Transferencia",
    PAYPAL: "PayPal",
    OTHER: "Otro"
  };
  return methods[method] || method;
};

// Formatear estado de pago
const formatPaymentStatus = (status: string) => {
  const statuses: Record<string, string> = {
    PENDING: "Pendiente",
    PAID: "Pagado",
    FAILED: "Fallido",
    REFUNDED: "Reembolsado"
  };
  return statuses[status] || status;
};

// Formatear origen del pedido
const formatSource = (source: string) => {
  const sourceMap: Record<string, string> = {
    WEB: "Web",
    WHATSAPP: "WhatsApp"
  };
  return sourceMap[source] || source;
};

// Función para convertir número a palabras (versión básica)
const amountInWords = (amount: number) => {
  if (!amount) return 'SON CERO CON 00/100 SOLES';

  const num = Math.floor(amount);
  const decimals = Math.round((amount - num) * 100);

  const units = ['', 'UNO', 'DOS', 'TRES', 'CUATRO', 'CINCO', 'SEIS', 'SIETE', 'OCHO', 'NUEVE'];
  const tens = ['DIEZ', 'ONCE', 'DOCE', 'TRECE', 'CATORCE', 'QUINCE', 'DIECISEIS', 'DIECISIETE', 'DIECIOCHO', 'DIECINUEVE'];
  const dozens = ['', '', 'VEINTE', 'TREINTA', 'CUARENTA', 'CINCUENTA', 'SESENTA', 'SETENTA', 'OCHENTA', 'NOVENTA'];
  const hundreds = ['CIEN', 'CIENTO', 'DOSCIENTOS', 'TRESCIENTOS', 'CUATROCIENTOS', 'QUINIENTOS', 'SEISCIENTOS', 'SETECIENTOS', 'OCHOCIENTOS', 'NOVECIENTOS'];

  let words = 'SON ';

  if (num >= 100) {
    words += hundreds[Math.floor(num / 100)] + ' ';
    const remainder = num % 100;
    if (remainder > 0) words += ' ' + convertTens(remainder);
  } else if (num > 0) {
    words += convertTens(num);
  } else {
    words += 'CERO';
  }

  words += ` CON ${decimals.toString().padStart(2, '0')}/100 SOLES`;
  return words;

  function convertTens(n: number) {
    if (n < 10) return units[n];
    if (n >= 10 && n < 20) return tens[n - 10];
    if (n >= 20 && n < 100) {
      const dozen = dozens[Math.floor(n / 10)];
      const unit = n % 10;
      return dozen + (unit > 0 ? ' Y ' + units[unit] : '');
    }
    return '';
  }
};

// Obtener detalles del pedido
const fetchOrder = async () => {
  loading.value = true
  try {
    const { data: response, error } = await useFetch(`/api/v1/orders/${id}`, {
      // Configuración importante:
      server: false, // Fuerza llamada desde cliente
      transform: (res) => {
        return res?.data || res // Maneja ambos formatos de respuesta
      }
    })

    if (error.value) {
      throw error.value
    }

    console.log("Respuesta completa:", response.value)

    if (!response.value) {
      throw new Error("La respuesta está vacía")
    }

    order.value = response.value
    internalNotes.value = order.value.internalNotes || ''

  } catch (err) {
    console.error("Error al cargar orden:", err)
    $toast.error("No se pudo cargar el pedido")
    // Redirige después de 2 segundos
    //  setTimeout(() => navigateTo('/dashboard/order-history'), 2000)
  } finally {
    loading.value = false
  }
}

// Función para imprimir
const printPage = () => {
  compactView.value = true;
  nextTick(() => {
    window.print();
    setTimeout(() => {
      compactView.value = false;
    }, 100);
  });
};

// Carga inicial
onMounted(() => {
  if (route.query.data) {
    try {
      order.value = JSON.parse(decodeURIComponent(route.query.data as string));
    } catch (e) {
      console.error("Error al parsear datos de URL:", e);
      fetchOrder();
    }
  } else {
    fetchOrder();
  }
});

// Observar cambios en el ID de la ruta
watch(() => route.params.id, (newId) => {
  if (newId) fetchOrder();
});
</script>

<style>
@media print {
  @page {
    size: auto;
    /* Cambiado de A4 a auto para mejor ajuste */
    margin: 5mm;
    /* Márgenes más pequeños */
  }

  body {
    -webkit-print-color-adjust: exact;
    print-color-adjust: exact;
    background: white;
    color: black;
    font-size: 11px;
    /* Tamaño de fuente más pequeño */
    line-height: 1.2;
    font-family: Arial, sans-serif;
  }

  /* Ocultar todo excepto el recibo compacto */
  body * {
    visibility: hidden;
  }

  .compact-receipt,
  .compact-receipt * {
    visibility: visible;
  }

  .compact-receipt {
    position: absolute;
    left: 0;
    top: 0;
    width: 80mm;
    /* Ancho estándar para tickets */
    margin: 0 auto;
    padding: 0;
    background: white;
  }

  .compact-receipt table {
    width: 100%;
    border-collapse: collapse;
    margin: 3mm 0;
  }

  .compact-receipt th,
  .compact-receipt td {
    padding: 1mm 0;
    border-bottom: 0.5px solid #ddd;
  }

  .compact-receipt .font-bold {
    font-weight: bold;
  }

  .compact-receipt .text-lg {
    font-size: 12px;
  }

  .compact-receipt .text-xs {
    font-size: 10px;
  }
}

/* Ocultar vista compacta en pantalla */
.compact-receipt {
  display: none;
}

/* Estilos normales para pantalla */
.print\:p-0 {
  padding: 0 !important;
}

.print\:rounded-none {
  border-radius: 0 !important;
}

.print\:shadow-none {
  box-shadow: none !important;
}

.print\:bg-transparent {
  background-color: transparent !important;
}
</style>